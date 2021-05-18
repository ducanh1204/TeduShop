using System.Collections.Generic;
using TeduShop.Data.Repositories;
using TeduShop.Model.Models;

namespace TeduShop.Service
{
    public interface IApplicationModuleService
    {
        IEnumerable<ApplicationModule> GetAllModule();
    }
    public class ApplicationModuleService : IApplicationModuleService
    {
        private readonly IApplicationModuleRepository _applicationModuleRepository;
        public ApplicationModuleService(IApplicationModuleRepository applicationModuleRepository)
        {
            _applicationModuleRepository = applicationModuleRepository;
        }
        public IEnumerable<ApplicationModule> GetAllModule()
        {
            return _applicationModuleRepository.GetAllModule();
        }
    }
}