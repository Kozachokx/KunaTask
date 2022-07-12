/*
необходимо написать AsyncQueue которая сохранит последовательность

  const queue = new AsyncQueue()
  await Promise.all([
    queue.add(() => task(1)),
    queue.add(() => task(2)),
    queue.add(() => task(3)),
    queue.add(() => task(4)),
  ]);

*/

const task = async <T>(value: T) => {
  await new Promise((r) => setTimeout(r, 1000 * Math.random()));
  console.log(value);
  return value;
};

const someAsync = async () => {
  const PREFIX = `[someAsync]`
  console.log(`${PREFIX} Start... `)

  await Promise.all([
    task(1),
    task(2),
    task(3),
    task(4),
  ]);
  console.log(`${PREFIX} Finished `)
}
// someAsync()



// Синхронно одна за одною
async function syncQueue<T> ( functions: (() => Promise<T>)[] ): Promise<T[]> {
  const PREFIX = `[syncQueue]`
  console.log(`${PREFIX} Start... `)

  const results = [];
  for (const func of functions) {
    results.push(await func());
  }

  console.log(`${PREFIX} Finished `)
  return results;
}

function runSyncQueue() {
  return syncQueue([
    () => task(1),
    () => task(2),
    () => task(3),
    () => task(4),
  ])
}


class AsyncQueue {
  private promises: (() => Promise<any>)[] = [];
  private iterator = 0;
  private added = 0;
  private ms = 10;

  constructor() {}

  private async queue(num: number) {
    while ( num != this.iterator ) { 
      await new Promise(resolve => setTimeout(resolve, this.ms))
    }

    return await this.promises[num]().then(res => {
      this.iterator++;
      return res;
    })
  }

  async add( funct: () => Promise<any> ) {
    return new Promise(async (resolve) => {
      this.promises.push(funct)
      const res = await this.queue(this.added++)
      resolve(res);
    })
  }
}

  
const runAsyncQueue = async () => {
  const PREFIX = `[AsyncQueue]`
  console.log(`${PREFIX} Start... `)

  const queue = new AsyncQueue();

  const x = await Promise.all([
    queue.add(() => task(1)),
    queue.add(() => task(2)),
    queue.add(() => task(3)),
    queue.add(() => task(4)),
  ]);

  console.log(x)
  console.log(`${PREFIX} Finished `)
}

// s1()

const main = async () => {
  console.log('\n\n Async implementation: ')
  await someAsync()
  
  console.log('\n\n Sync implementation: ')
  await runSyncQueue()
  
  console.log('\n\n Sync implementation via class: ')
  await runAsyncQueue()
}

main()
