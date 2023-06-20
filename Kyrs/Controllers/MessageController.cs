using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Kyrs.Data;
using Kyrs.Dtos;
using Kyrs.Helpers;
using Kyrs.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kyrs.Controllers
{
    [Route("/message")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly ProductContext _context;
        private readonly CipherService _cipherService;

        public MessageController(ProductContext context, CipherService cipherService)
        {
            _context = context;
            _cipherService = cipherService;
        }
        
        //get api/message
        [HttpGet]
        public async Task<ActionResult<IEnumerable<message>>> GetMessages()
        {
            return await _context.messages.ToListAsync();
        }

        //get api/message/1
        [HttpGet("{id}")]
        public async Task<ActionResult<message>> GetMessage(int id)
        {
            var msg = await _context.messages.FindAsync(id);
            if (msg == null)
            {
                return NotFound();
            }
            return msg;
        }
        
        // показывает отправленные сообщения
        //get api/message/1/sendedmessages
        [HttpGet("{id}/sendedmessages")]
        public async Task<IEnumerable<message>> GetSendedMessagesById(int id)
        {
            var msg = await _context.messages
                .Where(m => m.userid == id) 
                .OrderByDescending(d => d.time)
                .ToListAsync();
            foreach (var m in msg)
            {
                var text = _cipherService.Decrypt(m.text);
                m.text = text;
            }
            return msg;
        }
        
        [HttpGet("{id}/receivedmessages")]
        public async Task<IEnumerable<message>> GetReceivedMessagesById(int id)
        {
            var msg = await _context.messages
                .Where(m => m.receiverid == id)
                .OrderByDescending(d => d.time)
                .ToListAsync();
            foreach (var m in msg)
            {
                var text = _cipherService.Decrypt(m.text);
                m.text = text;
            }
            return msg;
        }
        
        /*
        // показывает полученные сообщения
        //get api/message/1/receivedmessages
        [HttpGet("{id}/receivedmessages")]
        public async Task<IActionResult> GetReceivedMessagesById(int id)
        {
            //получаем список товаров данного продавца
            var prods = await _context.products
                .Where(p => p.userid == id)
                .ToListAsync();
            
            List<message> msgs = new List<message>();
            
            foreach (var prod in prods)
            {
                var msg = await _context.messages
                    .Where(m => m.productid == prod.id)
                    .ToListAsync();
                msgs.AddRange(msg);
            }

            var dtoList = new List<MessageDto>();
            foreach (var m in msgs)
            {
                dtoList.Add(new MessageDto()
                    {
                        id = m.id, text = m.text, time = m.time, userid = m.userid, productid = m.productid
                    }
                );
            }
            return new JsonResult(dtoList);
            
        }
        */

        [HttpGet("{id}/products")]
        public async Task<IEnumerable<product>> GetProductsById(int id)
        {
            var prod = await _context.products
                .Where(p => p.userid == id)
                .ToListAsync();
                
            return prod;
        } 
        
        // достаем из сообщения отправителя
        //get api/message/userid/1
        [HttpGet("userid/{id}")]
        public async Task<ActionResult> GetSenderUserIdFromMessage(int id)
        {
            var msg = await _context.messages.FindAsync(id);
            if (msg == null)
            {
                return NotFound();
            }
            
            var user = await _context.users.FindAsync(msg.userid);
            var resultDto = new {Id = user.id, Fio = user.fio, Mobile = user.mobile};
            return new JsonResult(resultDto);
        }
        
        [HttpGet("receiverid/{id}")]
        public async Task<ActionResult> GetReceiverUserIdFromMessage(int id)
        {
            var msg = await _context.messages.FindAsync(id);
            if (msg == null)
            {
                return NotFound();
            }
            
            var user = await _context.users.FindAsync(msg.receiverid);
            var resultDto = new {Id = user.id, Fio = user.fio, Mobile = user.mobile};
            return new JsonResult(resultDto);
        }
        
        // достаем из сообщения продукт
        //get api/message/productid/1
        [HttpGet("productid/{id}")]
        public async Task<ActionResult> GetProductIdFromMessage(int id)
        {
            var msg = await _context.messages.FindAsync(id);
            if (msg == null)
            {
                return NotFound();
            }
            
            var prod = await _context.products.FindAsync(msg.productid);
            var resultDto = new {Id = prod.id, Name = prod.name};
            return new JsonResult(resultDto);
        }
        
        // отправляем сообщение
        //post api/message
        [HttpPost]
        public async Task<ActionResult<message>> SendMessage(message msg)
        {
            var date = DateTime.Now;
            date = new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second);
            msg.time = date;
            var text = _cipherService.Encrypt(msg.text);
            msg.text = text;
            _context.messages.Add(msg);
            await _context.SaveChangesAsync();
            var newmsg = await _context.messages.FindAsync(msg.id);
            if (newmsg == null)
            {
                NotFound();
            }
            return newmsg;
        }
        
    }
}