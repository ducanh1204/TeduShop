namespace TeduShop.Model.MappingModels
{
    public class ProductExportInfor_Mapping
    {
        public string Name { set; get; }

        public string Description { set; get; }

        public string Warranty { set; get; }

        public decimal Price { set; get; }

        public decimal? PromotionPrice { set; get; }

        public string Content { set; get; }

        public string MetaKeyword { set; get; }

        public string MetaDescription { set; get; }

        public bool Status { get; set; }
        public bool? HomeFlag { set; get; }

        public bool? HotFlag { set; get; }
    }
}