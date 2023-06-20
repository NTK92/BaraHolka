using System;

namespace Kyrs.Dtos
{
    public class MessageDto
    {
        public int id { get; set; }
        
        public string text { get; set; }

        public DateTime time { get; set; }

        public int userid { get; set; }
        
        
        public int receiverid { get; set; }
        
        public int productid { get; set; }
    }
}