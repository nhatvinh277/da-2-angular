export class ItemModel{
    IdItem: string
    IdType: string
    Name: string
    Money: string
    Sales: string
    RateAvg: number
    RateNumber: number
    LinkImage: string
    UserReview: UserReview[]

    clear(){
        this.IdItem = '';
        this.IdType = '';
        this.Name = '';
        this.Money = '';
        this.Sales = '';
        this.RateAvg = 0;
        this.RateNumber = 0;
        this.LinkImage = '';
        this.UserReview = [];

    }

    copy(item: ItemModel){
        this.IdItem = item.IdItem;
        this.IdType = item.IdType;
        this.Name = item.Name;
        this.Money = item.Money;
        this.Sales = item.Sales;
        this.RateAvg = item.RateAvg;
        this.RateNumber = item.RateNumber;
        this.LinkImage = item.LinkImage;
        this.UserReview = item.UserReview;
    }
}

export class UserReview{
    AccountName: string
    Time: string
    Text: string
    Rate: string

    clear(){
        this.AccountName = '';
        this.Time = '';
        this.Text = '';
        this.Rate = '';
    }

    copy(item: UserReview){
        this.AccountName = item.AccountName;
        this.Time = item.Time;
        this.Text = item.Text;
        this.Rate = item.Rate;
    }
}

export class ItemOrdersModel{
    IdItem: string
    Name: string
    Money: string
    Sales: string
    Quantity: number
    RateAvg: string
    LinkImage: string

    clear(){
        this.IdItem = '';
        this.Quantity = 0;
        this.Name = '';
        this.Money = '';
        this.Sales = '';
        this.RateAvg = '';
        this.LinkImage = '';
    }

    copy(item: ItemOrdersModel){
        this.IdItem = item.IdItem;
        this.Quantity = item.Quantity;
        this.Name = item.Name;
        this.Money = item.Money;
        this.Sales = item.Sales;
        this.RateAvg = item.RateAvg;
        this.LinkImage = item.LinkImage;
    }
}