﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeduShop.Web.Models
{
    public class ApplicationModuleViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string URL { get; set; }
        public int ParentID { get; set; }
    }
}