import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../../types/operation';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { selectDebit, selectOperations } from '../../store/selectors/app.selectors';
import { map } from 'rxjs/operators';
import { GetBudgetAction } from '../../store/actions/budget.actions';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
	public operations$: Observable<Operation[]>;
	public debit$: Observable<number>;

	constructor(private store: Store<AppState>) {
		this.operations$ = store.pipe(
			select(selectOperations),
			map(operations => operations.sort((a, b) => a.date < b.date ? 1 : -1))
		);

		this.debit$ = store.pipe(select(selectDebit));
	}

	ngOnInit() {
		this.store.dispatch(new GetBudgetAction());
	}
}
