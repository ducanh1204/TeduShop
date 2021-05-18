using AutoMapper;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TeduShop.Model.Models;
using TeduShop.Service;
using TeduShop.Web.Infrastructure.Core;
using TeduShop.Web.Models;

namespace TeduShop.Web.Api
{
    [RoutePrefix("api/timeattendency/appmodule")]
    public class ApplicationModuleController : ApiControllerBase
    {
        private IApplicationModuleService _appModuleService;

        public ApplicationModuleController(IErrorService errorService,
            IApplicationModuleService appModuleService) : base(errorService)
        {
            this._appModuleService = appModuleService;
        }


        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage GetAll(HttpRequestMessage request = null)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _appModuleService.GetAllModule();

                var responseData = Mapper.Map<IEnumerable<ApplicationModule>, IEnumerable<ApplicationModuleViewModel>>(model);

                var response = request.CreateResponse(HttpStatusCode.OK, responseData);

                return response;
            });
        }

    }
}