using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Kyrs.Models
{
    public class product
    {
        [Key][Required]
        public int id { get; set; }

        public string name { get; set; }
        
        public string picture { get; set; }
        
        public string description { get; set; }
        
        public string price { get; set; }

        public int userid { get; set; }

        public user user { get; set; }
        
        public ICollection<message> message { get; set; }
    }
}