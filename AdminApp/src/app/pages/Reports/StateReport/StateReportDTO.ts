interface StateReportDTO {
    state: string;
    companyGoods: number;
    companyService: number;
    companyGoodsService: number;
    individualGoods: number;
    individualService: number;
    individualGoodService: number;
    companySmeGoods: number;
    companySmeService: number;
    companySmeGoodsService: number;
    individualSmeGoods: number;
    individualSmeService: number;
    individualSmeGoodService: number;
    total: number;
    companyTotal: number;
    individualTotal: number;
    smeCompanyTotal: number;
    smeIndividualTotal: number;
}
export default StateReportDTO;