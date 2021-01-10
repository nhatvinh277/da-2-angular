import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BaseDataSource } from '../../_common/_datasources/base.datasource';
import { QueryParamsModel } from '../../_common/_models/query-params.model';
import { AdminItemService } from '../admin-items-service/admin-items.service';

export class AdminItemsDataSource extends BaseDataSource {
	constructor(private productsService: AdminItemService) {
		super();
	}

	loadDatas(queryParams: QueryParamsModel) {
		this.productsService.lastFilter$.next(queryParams);
        this.loadingSubject.next(true);
		this.productsService.getData(queryParams)
			.pipe(
				tap(resultFromServer => {
					if (resultFromServer.data != null && resultFromServer.data != undefined) {
						this.entitySubject.next(resultFromServer.data);
						this.paginatorTotalSubject.next(resultFromServer.page.TotalCount);
					}
					else {
						this.entitySubject.next(null);
						this.paginatorTotalSubject.next(null);
					}
				}),
				catchError(err => of("Phiên đăng nhập hết hạn")),
				finalize(() => this.loadingSubject.next(false))
			).subscribe();
	}
}
