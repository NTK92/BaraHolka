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
    [Route("/[controller]")]
    [ApiController]

    public class ProductController : ControllerBase
    {
        private readonly ProductContext _context;

        public ProductController(ProductContext context)
        {
            _context = context;
        }

        //get api/product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<product>>> GetProducts()
        {
            return await _context.products.OrderBy(i => i.id).ToListAsync();
        }

        //get api/product/1
        [HttpGet("{id}")]
        public async Task<ActionResult<product>> GetProduct(int id)
        {
            var prod = await _context.products.FindAsync(id);
            if (prod == null)
            {
                return NotFound();
            }

            return prod;
        }
        
        //get api/product/userid/1
        [HttpGet("userid/{id}")]
        public async Task<ActionResult> GetProductUserId(int id)
        {
            var prod = await _context.products.FindAsync(id);
            if (prod == null)
            {
                return NotFound();
            }
            
            var user = await _context.users.FindAsync(prod.userid);
            var resultDto = new {Id = user.id, Fio = user.fio, Mobile = user.mobile};
            return new JsonResult(resultDto);
        }


        //put api/product/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, product prod)
        {
            if (id != prod.id)
            {
                return BadRequest();
            }

            _context.Entry(prod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        //post api/product
        [HttpPost]
        public async Task<ActionResult<product>> PostProduct(product prod)
        {
            _context.products.Add(prod);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetProduct", new {id = prod.id}, prod);
        }
        
        //post api/product
        [HttpPost("create")]
        public async Task<ActionResult<product>> PostProductById( int userid,string name,string picture,string description,string price)
        {
            var Dto = new {name,picture,description,price,userid};

            product prod = new product();
            
            _context.products.Add(prod);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetProduct", new {id = prod.id}, prod);
        }

        //delete api/product/1
        [HttpDelete("{id}")]
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

        private bool ProductExists(int id)
        {
            return _context.products.Any(e => e.id == id);
        }

        
    }
}