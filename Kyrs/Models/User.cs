using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Kyrs.Models
{
    public class user
    {
        [Key] [Required] 
        public int id { get; set; }
        
        //[Required(ErrorMessage = "Не указан логин")]
        public string login { get; set; }
        
        //[Required(ErrorMessage = "Не указан пароль")]
        public string password { get; set; }
        
        public string fio { get; set; } 
        
        public string mobile { get; set; } 

        public ICollection<product> product { get; set; }
        
        public ICollection<message> message { get; set; }

    }
    
}