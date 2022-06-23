import { Route } from '@angular/router';
import { ScrumboardBoardResolver, ScrumboardBoardsResolver, ScrumboardCardResolver } from '../../resolvers/scrumboard/scrumboard.resolvers';
import { ScrumboardBoardsComponent } from './boards/boards.component';
import { ScrumboardBoardComponent } from './board/board.component';
import { ScrumboardCardComponent } from './card/card.component';
export const scrumboardRoutes: Route[] = [
  {
    path: '',
    component: ScrumboardBoardsComponent,
    resolve: {
      boards: ScrumboardBoardsResolver,
    },
  },
  {
    path: ':boardId',
    component: ScrumboardBoardComponent,
    resolve: {
      board: ScrumboardBoardResolver,
    },
    children: [
      {
        path: 'card/:cardId',
        component: ScrumboardCardComponent,
        resolve: {
          card: ScrumboardCardResolver,
        },
      },
    ],
  },
];
