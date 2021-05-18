using System.Collections.Generic;
using TeduShop.Data.Infrastructure;
using TeduShop.Model.Models;
using System.Linq;
using System.Data.Linq.SqlClient;
using TeduShop.Model.MappingModels;

namespace TeduShop.Data.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
        IEnumerable<ProductExportInfor_Mapping> GetListProductExIf(string keyword);
    }

    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public IEnumerable<ProductExportInfor_Mapping> GetListProductExIf(string keyword)
        {
            if (!string.IsNullOrEmpty(keyword))
            {
                var query = from p in DbContext.Products
                            where p.Name.Contains(keyword) || p.Description.Contains(keyword)
                            select new ProductExportInfor_Mapping
                            {
                                Name = p.Name,
                                Description = p.Description,
                                Warranty = p.Warranty + " tháng",
                                Price = p.Price,
                                PromotionPrice = p.PromotionPrice,
                                Content = p.Content,
                                MetaKeyword = p.MetaKeyword,
                                MetaDescription = p.MetaDescription,
                                Status = p.Status,
                                HomeFlag = p.HomeFlag,
                                HotFlag = p.HotFlag,
                            };
                return query;
            }
            else
            {
                var query = from p in DbContext.Products
                            select new ProductExportInfor_Mapping
                            {
                                Name = p.Name,
                                Description = p.Description,
                                Warranty = p.Warranty+ " tháng",
                                Price = p.Price,
                                PromotionPrice = p.PromotionPrice,
                                Content = p.Content,
                                MetaKeyword = p.MetaKeyword,
                                MetaDescription = p.MetaDescription,
                                Status = p.Status,
                                HomeFlag = p.HomeFlag,
                                HotFlag = p.HotFlag,
                            };
                return query;
            }
            
        }
    }
}