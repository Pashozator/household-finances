import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from '../../modules/core/services/api.service';
import { Observable, of } from 'rxjs';
import { ActionWithPayload } from '../interfaces/action-with-payload';
import { Action } from '@ngrx/store';
import {
	AddOperationFailureAction,
	AddOperationSuccessAction,
	BudgetActionTypes,
	EditOperationFailureAction,
	EditOperationSuccessAction,
	GetBudgetFailureAction,
	GetBudgetSuccessAction,
	RemoveOperationFailureAction,
	RemoveOperationSuccessAction
} from '../actions/budget.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Operation } from '../../types/operation';
import { ErrorService } from '../../modules/error/services/error.service';

@Injectable()
export class BudgetEffects {
	@Effect()
	public getBudget$: Observable<ActionWithPayload<any> | Action> = this.actions$
		.pipe(
			ofType(BudgetActionTypes.GET_BUDGET),
			switchMap(() => this.api.getBudget()
				.pipe(
					map(res => new GetBudgetSuccessAction(res.data)),
					catchError(() => of(new GetBudgetFailureAction()))
				)
			)
		);

	@Effect()
	public addOperation$: Observable<ActionWithPayload<any> | Action> = this.actions$
		.pipe(
			ofType(BudgetActionTypes.ADD_OPERATION),
			switchMap((action: ActionWithPayload<Operation>) => this.api.addOperation(action.payload)
				.pipe(
					map(res => new AddOperationSuccessAction(res.data)),
					catchError(() => of(new AddOperationFailureAction()))
				)
			)
		);

	@Effect()
	public editOperation$: Observable<ActionWithPayload<any> | Action> = this.actions$
		.pipe(
			ofType(BudgetActionTypes.EDIT_OPERATION),
			switchMap((action: ActionWithPayload<Operation>) => this.api.editOperation(action.payload)
				.pipe(
					map(res => new EditOperationSuccessAction(action.payload)),
					catchError(() => of(new EditOperationFailureAction()))
				)
			)
		);

	@Effect()
	public removeOperation$: Observable<ActionWithPayload<any> | Action> = this.actions$
		.pipe(
			ofType(BudgetActionTypes.REMOVE_OPERATION),
			switchMap((action: ActionWithPayload<Operation>) => this.api.removeOperation(action.payload)
				.pipe(
					map(res => new RemoveOperationSuccessAction(action.payload)),
					catchError(() => of(new RemoveOperationFailureAction()))
				))
		);

	@Effect({ dispatch: false })
	public failure$ = this.actions$
		.pipe(
			ofType(
				BudgetActionTypes.GET_BUDGET_FAILURE,
				BudgetActionTypes.ADD_OPERATION_FAILURE,
				BudgetActionTypes.EDIT_OPERATION_FAILURE,
				BudgetActionTypes.REMOVE_OPERATION_FAILURE
			),
			tap(() => this.error.occurs())
		);

	constructor(
		private actions$: Actions,
		private error: ErrorService,
		private api: ApiService
	) {
	}
}
