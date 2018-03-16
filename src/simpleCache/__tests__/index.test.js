import queue from 'async/queue';
import times from 'lodash/times';

// const PAGE_SIZE = 5;
//
// const fetchCountAsync = (url) => {
//   return Promise.resolve(50);
// };
//
// const fetchPagingAsync = (pageSize, pageNumber) => {
//   return Promise.resolve([{ pageSize, pageNumber }]);
// }

describe('it should work', function() {
  it('fake test', () => {
    const numbers = Array.from(Array(10).keys());
    
    const taskAsync = (delayTime) => {
      console.log('starts with delayTime: ', delayTime);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, delayTime * (1000 - Math.random()))
      });
    };
    
    const tasks = numbers.map((delayTime) => () => taskAsync(delayTime));
    const q = queue((task, callback) => {
      task().then(() => callback());
    }, 3);
    
    q.drain = () => {
      console.log('all items have been processed');
    };
    
    q.push(tasks, (error) => {
      if(error) {
        console.log('error: ', error);
      }
    })
  });
});

// describe('', () => {
//   it('', () => {
//     console.log('goes here');
//     /*const taskAsync = (delayTime) => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           console.log('delayTime: ', delayTime);
//           resolve();
//         }, delayTime)
//       });
//     }*/
//
//
//     // const tasks = numbers.map((delayTime) => () => taskAsync(delayTime));
//     // console.log('tasks: ', tasks);
//     // const q = queue((task, callback) => {
//     //   task().then(() => callback());
//     // }, 5);
//     //
//     // // assign a callback
//     // q.drain = () => {
//     //   console.log('all items have been processed');
//     // };
//     //
//     // q.push(tasks, (error) => {
//     //   if(error) {
//     //     console.log('error: ', error);
//     //   }
//     // })
//   });
// });