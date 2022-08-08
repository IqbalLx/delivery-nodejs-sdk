import { IQuotation } from "../response/quotation";
import BaseHTTPClient from "./base";
import QuotationPayload from "../payload/quotationPayload";

export default class QuotationHTTPClient extends BaseHTTPClient {
    create(market: string, path: string, body: QuotationPayload): Promise<IQuotation> {
        return new Promise<IQuotation>((resolve, reject) => {
            const response = this.makeCall<QuotationPayload>(market, path, body, "POST");
            response
                .then((d: any) => {
                    const q = d;
                    q.id = q.quotationId;
                    delete q.quotationId;

                    q.stops.forEach((stopData: any) => {
                        const s = stopData;
                        s.id = s.stopId;
                        delete s.stopId;
                    });

                    resolve(<IQuotation>(<unknown>q));
                })
                .catch((e) => {
                    reject(new Error(e.mapErrorMessage(e)));
                });
        });
    }

    get(market: string, path: string): Promise<IQuotation> {
        return new Promise<IQuotation>((resolve, reject) => {
            const response = this.makeCall<null>(market, path);
            response
                .then((d: any) => {
                    const q = d;
                    q.id = q.quotationId;
                    delete q.quotationId;

                    q.stops.forEach((stopData: any) => {
                        const s = stopData;
                        s.id = s.stopId;
                        delete s.stopId;
                    });

                    resolve(<IQuotation>(<unknown>q));
                })
                .catch((e) => {
                    reject(new Error(e.mapErrorMessage(e)));
                });
        });
    }
}
