using RestSharp;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TimeAttendency.WebApp.Models;

namespace TeduShop.Web.Api
{
    [RoutePrefix("api/timeattendency/account")]
    public class AccountController : ApiController
    {
        public AccountController()
        {
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public HttpResponseMessage Login([FromBody] LoginRequestModel requestModel, HttpRequestMessage httpRequest = null)
        {
            string host = HttpContext.Current.Request.Url.OriginalString;
            string[] host1 = host.Split('/');
            string url = host1[0] + "//" + host1[2] + "/oauth/token";

            RestClient client = new RestClient();
            RestRequest request = new RestRequest(url, Method.POST);
            client.RemoteCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;
            request.AddHeader("Accept", "application/x-www-form-urlencoded");
            request.AddParameter("username", requestModel.userName, ParameterType.GetOrPost);
            request.AddParameter("grant_type", requestModel.grant_type, ParameterType.GetOrPost);
            request.AddParameter("password", requestModel.password, ParameterType.GetOrPost);
            IRestResponse<TokenModel> response = client.Execute<TokenModel>(request);
            HttpResponseMessage responseData = null;
            if (response.StatusCode != HttpStatusCode.OK)
            {
                responseData = httpRequest.CreateResponse(response.StatusCode, response.Content);
            }
            else
                responseData = httpRequest.CreateResponse(response.StatusCode, response.Data.access_token);
            return responseData;
        }
    }
}