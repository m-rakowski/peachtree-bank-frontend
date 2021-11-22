// import { initialState, transfersReducers, TransfersState } from './transfer.reducers';
// import { TransferStatus } from '../../models/transfer';
// import { moveAction } from '../actions/transfer.actions';
// import { MoveRequest } from '../../models/move-request';
//
// describe('unknown action', () => {
//   it('should return the default state', () => {
//     const action = {
//       type: 'uydjhdfdhalkjfha',
//     };
//
//     const state = transfersReducers(initialState, action);
//
//     expect(state).toBe(initialState);
//   });
// });
// xdescribe('moveAction', () => {
//   it('should make sure that when the action is dispatched a reducer catches it and reconfigures the state', () => {
//     const initialState: TransfersState = {
//       toDo: [
//         {
//           title: '0',
//           content: 'null',
//           status: TransferStatus.toDo,
//           id: '04f3bdaf-ca94-4be2-8f8f-7936d7b29774',
//           nextId: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
//           isRoot: true,
//         },
//         {
//           title: '1',
//           content: 'null',
//           status: TransferStatus.toDo,
//           id: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
//           nextId: '31da9a19-dc1b-4992-91b7-04e051a41148',
//           isRoot: false,
//         },
//         {
//           title: '2',
//           content: 'null',
//           status: TransferStatus.toDo,
//           id: '31da9a19-dc1b-4992-91b7-04e051a41148',
//           nextId: '77b22676-7463-4135-ba63-f85251a4f42a',
//           isRoot: false,
//         },
//         {
//           title: '3',
//           content: 'null',
//           status: TransferStatus.toDo,
//           id: '77b22676-7463-4135-ba63-f85251a4f42a',
//           nextId: null,
//           isRoot: false,
//         },
//       ],
//       toTest: [],
//       done: [],
//       updateInProgress: false,
//     };
//     const newState: TransfersState = {
//       toDo: [
//         {
//           title: '2',
//           content: 'null',
//           status: TransferStatus.toDo,
//           id: '31da9a19-dc1b-4992-91b7-04e051a41148',
//           nextId: '04f3bdaf-ca94-4be2-8f8f-7936d7b29774',
//           isRoot: true,
//         },
//         {
//           title: '0',
//           content: 'null',
//           status: TransferStatus.toDo,
//           id: '04f3bdaf-ca94-4be2-8f8f-7936d7b29774',
//           nextId: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
//           isRoot: false,
//         },
//         {
//           title: '1',
//           content: 'null',
//           status: TransferStatus.toDo,
//           id: '419e6aa9-d750-4143-92e3-ba70a09bb0a0',
//           nextId: '77b22676-7463-4135-ba63-f85251a4f42a',
//           isRoot: false,
//         },
//         {
//           title: '3',
//           content: 'null',
//           status: TransferStatus.toDo,
//           id: '77b22676-7463-4135-ba63-f85251a4f42a',
//           nextId: null,
//           isRoot: false,
//         },
//       ],
//       toTest: [],
//       done: [],
//       updateInProgress: false,
//     };
//
//     const props: MoveRequest = {
//       movedTransferId: '31da9a19-dc1b-4992-91b7-04e051a41148',
//       afterThisOneId: '',
//     };
//
//     const action = moveAction({ moveRequest: props });
//     const state = transfersReducers(initialState, action);
//
//     expect(state).toEqual(newState);
//     expect(state).not.toBe(newState);
//   });
// });
