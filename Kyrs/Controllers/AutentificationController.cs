using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Kyrs.Data;
using Kyrs.Helpers;
using Kyrs.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kyrs.Controllers
{

    [Route("/auth")]
    [ApiController]
    public class AutentificationController : ControllerBase
    {
        private readonly ProductContext _context;
        private readonly Jwt _jwt;

        public AutentificationController(ProductContext context, Jwt jwt)
        {
            _context = context;
            _jwt = jwt;
        }
        
        [HttpPost("signin")]
        public ActionResult<user> SignIn(user signinuser)
        {
            var userDto = new
            {
                login = signinuser.login,
                password = signinuser.password
            };
            var usr = _context.users.FirstOrDefault(s => s.login.Contains(userDto.login));
            if (usr == null)
            {
                return BadRequest();
            }
            if (usr.password != ComputeSha256Hash(userDto.password))
                return NotFound();

            var jwt = _jwt.Generate(usr.id);
            Response.Cookies.Append("jwt",jwt,new CookieOptions()
            {
                HttpOnly = true
            });
            /*Response.Cookies.Append("userid",usr.id.ToString(),new CookieOptions()
            {
                HttpOnly = true
            });*/
            return usr;
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<user>> Register(user registeruser)
        {
            /*var recaptchaHelper = this.GetRecaptchaVerificationHelper();
            
            if (String.IsNullOrEmpty(recaptchaHelper.Response))
            {
                ModelState.AddModelError("", "Captcha answer cannot be empty.");
                return View(model);
            }

            var recaptchaResult = recaptchaHelper.VerifyRecaptchaResponse();
*/
            
            //registeruser.password = BCrypt.Net.BCrypt.HashPassword(registeruser.password); 
            registeruser.password = ComputeSha256Hash(registeruser.password);
            
            var usr = _context.users.FirstOrDefaultAsync(s => s.login.Contains(registeruser.login)).Result;
            if (usr == null)
            {
                _context.users.Add(registeruser);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetUser", new { id = registeruser.id }, registeruser);
            }
            else
            {
                return NotFound();
            }
        }
        
        [HttpGet("user")]
        public async Task<IActionResult> UserCheck ()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwt.Verify(jwt);
                
                /*var userid = Request.Cookies["userid"];

                if (userid == null)
                {
                    return Unauthorized();
                }
                int id = int.Parse(userid);*/
                
                int id = int.Parse(token.Issuer);

                var user = await _context.users.FindAsync(id);
            
                return Ok(user);

            }
            catch (Exception)
            {

                return Unauthorized();
            }
            
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<user>> GetUser(int id)
        {
            var prod = await _context.users.FindAsync(id);
            if (prod == null)
            {
                return NotFound();
            }

            return prod;
        }
        
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            //Response.Cookies.Delete("userid");
            Response.Cookies.Delete("jwt");
            return await Task.FromResult(Ok(/*new { message = "Logged out" }*/));
        }
        
        static string ComputeSha256Hash(string rawData)  
        {  
            // Create a SHA256   
            using (SHA256 sha256Hash = SHA256.Create())  
            {  
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));  
  
                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();  
                for (int i = 0; i < bytes.Length; i++)  
                {  
                    builder.Append(bytes[i].ToString("x2"));  
                }  
                return builder.ToString();  
            }  
        }  
        
    }
}