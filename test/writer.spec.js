const { unlink, readFile } = require('fs');
const { writeToOutput } = require('../lib/writer');
const { Writable } = require('stream');

describe('Writer', () => {
  const testLog = 'This should be written to log';
  test('When provided console, should print to console log', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    await writeToOutput(testLog, console);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith(testLog);
    spy.mockRestore();
  });

  test('When provided filename, should successfully write to file', async () => {
    const path = __dirname + '/test.txt';
    await writeToOutput(testLog, path);
    const writtenData = await new Promise((resolve, reject) => {
      readFile(path, 'utf-8', (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    expect(writtenData).toEqual(testLog);
    await new Promise((resolve, reject) => {
      unlink(path, (err) => (err ? reject(err) : resolve(true)));
    });
  });

  test('When provided writable stream, should successfully write to stream', async () => {
    const stream = new Writable();
    let data = [];
    stream._write = (chunk) => {
      data.push(chunk);
    };
    stream.on('end', () => {
      data = data.join();
    });

    await writeToOutput(testLog, stream);
    expect(data.toString()).toEqual(testLog);
  });
});
