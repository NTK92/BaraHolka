using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Kyrs.Data;
using Kyrs.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kyrs.Controllers
{
    [Route("/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ProductContext _context;

        public UserController(ProductContext context)
        {
            _context = context;
        }

        //get api/user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<user>>> GetUsers()
        {
            return await _context.users.ToListAsync();
        }

        //get api/user/1
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
        
        //get api/user/1/products
        [HttpGet("{id}/products")]
        public async Task<IEnumerable<product>> GetProductsById(int id)
        {
            var prod = await _context.products
                .Where(p => p.userid == id)
                .ToListAsync();
            return prod;
        } 
        
        //put api/user/1
        [HttpPut("{id}/{fio}/{mobile}")]
        public async Task<IActionResult> PutUser(int id, string fio, string mobile)
        {
            /*if (id != prod.id){ return BadRequest(); }*/

            var prod = await _context.users.FindAsync(id);
            prod.fio = fio;
            prod.mobile = mobile;
            _context.Entry(prod).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
            
            /* try{await _context.SaveChangesAsync();}
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id)){return NotFound();}
                else{throw;}
            }*/
        }
        
        [HttpPut("{id}/same_fio/{mobile}")]
        public async Task<IActionResult> PutUserMobile(int id, string mobile)
        {
            var prod = await _context.users.FindAsync(id);
            prod.mobile = mobile;
            _context.Entry(prod).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
        [HttpPut("{id}/{fio}/same_mobile")]
        public async Task<IActionResult> PutUserFio(int id, string fio)
        {
            var prod = await _context.users.FindAsync(id);
            prod.fio = fio;
            _context.Entry(prod).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
        //post api/user
        [HttpPost("register")]
        public async Task<ActionResult<user>> Register(user registeruser)
        {
            /*var userDto = new { Login = registeruser.login ,
                Password = registeruser.password,
                Fio = registeruser.fio,
                Mobile = registeruser.mobile };*/
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
        
        [HttpPost("{userid}/product")]
        public async Task<ActionResult<product>> PostProduct(product prod)
        {
            _context.products.Add(prod);
            await _context.SaveChangesAsync();
            var newprod = await _context.products.FindAsync(prod.id);
            if (newprod == null)
            {
                NotFound();
            }
            return newprod;
        }
        
        [HttpDelete("{userid}/product/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var prod = await _context.products.FindAsync(id);
            if (prod == null)
            {
                return NotFound();
            }

            _context.products.Remove(prod);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
        //delete api/user/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var prod = await _context.users.FindAsync(id);
            if (prod == null)
            {
                return NotFound();
            }

            _context.users.Remove(prod);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
        private bool UserExists(int id)
        {
            return _context.users.Any(e => e.id == id);
        }
        
        private bool UserExistsLogin(string login)
        {
            return _context.users.Any(e => e.login ==login);
        }
    }
}