var validAccount = require("../libs/validator-account");
var validator = require("../libs/validator");
var detailSchema = new Schema({
	tk_no:{type:String,required:true,uppercase:true},
	tk_co:{type:String,required:true,uppercase:true},
	
	ma_kh_no:{type:String,uppercase:true,default:''},
	ma_kh_co:{type:String,uppercase:true,default:''},
	
	tien:{type:Number,default:0,required:true},
	tien_nt:{type:Number,default:0,required:true},
	
	ma_bp:{type:String,uppercase:true,default:''},
	ma_phi:{type:String,uppercase:true,default:''},
	ma_hd:{type:String,uppercase:true,default:''},
	ma_dt:{type:String,uppercase:true,default:''},
	ma_nv:{type:String,uppercase:true,default:''},
	line:{type:Number,default:0}
});
detailSchema.validate ={
	tk_no:validAccount.existsTk,
	tk_co:validAccount.existsTk,
	ma_kh_no:validator.existsKh,
	ma_kh_co:validator.existsKh
}
var vatvaoSchema = new Schema({
	ma_hoa_don:{type:String,default:'',uppercase:true,trim:true},
	ky_hieu_hoa_don:{type:String,default:'',required:true,uppercase:true,trim:true},
	ma_tc:{type:String,default:'',required:true,uppercase:true,trim:true},
	so_hd:{type:String,default:'',required:true,uppercase:true,trim:true},
	so_seri:{type:String,default:'',required:true,uppercase:true,trim:true},
	ngay_hd:{type:Date,required:true},
	
	t_tien:{type:Number,default:0,required:true},
	t_tien_nt:{type:Number,default:0,required:true},
	
	ma_thue:{type:String,required:true,uppercase:true},
	thue_suat:{type:Number,default:0,required:true},
	tk_thue_no:{type:String,required:true,uppercase:true},
	tk_du_thue:{type:String,required:true,uppercase:true},
	t_thue:{type:Number,default:0,required:true},//t_thue=t_tien*thue_suat/100
	t_thue_nt:{type:Number,default:0,required:true},//t_thue_nt=t_tien_nt*thue_suat/100
	
	t_hd:{type:Number,default:0,required:true},//t_hd=t_tien+t_thue
	t_hd_nt:{type:Number,default:0,required:true},//t_hd_nt = t_tien_nt + t_thue_nt
	
	ma_kh:{type:String,uppercase:true,default:''},
	ten_kh:{type:String,default:''},
	dia_chi:{type:String,default:''},
	ma_so_thue:{type:String,default:''},
	
	ten_vt:{type:String,default:''},
	line:{type:Number,default:0}
	
});
vatvaoSchema.validate = {
	tk_thue_no:validAccount.existsTk,
	tk_du_thue:validAccount.existsTk,
	ma_kh:validator.existsKh,
	ma_thue:validator.existsVat
}
var vatraSchema = new Schema({
	ma_hoa_don:{type:String,default:'',uppercase:true,trim:true},
	ky_hieu_hoa_don:{type:String,default:'',required:true,uppercase:true,trim:true},
	so_hd:{type:String,default:'',required:true,uppercase:true,trim:true},
	so_seri:{type:String,default:'',required:true,uppercase:true,trim:true},
	ngay_hd:{type:Date,required:true},
	
	t_tien:{type:Number,default:0,required:true},
	t_tien_nt:{type:Number,default:0,required:true},
	
	ma_thue:{type:String,required:true,uppercase:true},
	thue_suat:{type:Number,default:0,required:true},
	tk_thue_co:{type:String,required:true,uppercase:true},
	tk_du_thue:{type:String,required:true,uppercase:true},
	t_thue:{type:Number,default:0,required:true},//t_thue=t_tien*thue_suat/100
	t_thue_nt:{type:Number,default:0,required:true},//t_thue_nt=t_tien_nt*thue_suat/100
	
	t_hd:{type:Number,default:0,required:true},//t_hd=t_tien+t_thue
	t_hd_nt:{type:Number,default:0,required:true},//t_hd_nt = t_tien_nt + t_thue_nt
	
	ma_kh:{type:String,uppercase:true,default:''},
	ten_kh:{type:String,default:''},
	dia_chi:{type:String,default:''},
	ma_so_thue:{type:String,default:''},
	
	ten_vt:{type:String,default:''},
	line:{type:Number,default:0}
});
vatraSchema.validate = {
	tk_thue_co:validAccount.existsTk,
	tk_du_thue:validAccount.existsTk,
	ma_kh:validator.existsKh,
	ma_thue:validator.existsVat
}
var pktSchema = new Schema({
	id_app:{type:String,required:true},
	ma_dvcs:{type:String,required:true},
	kc_dvcs:{type:Boolean,default:false},
	ma_ct:{type:String,default:'PKT',required:true,uppercase:true},
	ma_gd:{type:String,default:'0'},
	so_ct:{type:String,required:true,uppercase:true,trim:true},
	ngay_ct:{type:Date,default:Date.now,required:true},
	ma_nt:{type:String,required:'ma_nt is required',default:'VND',trim:true,uppercase:true},
	ty_gia:{type:Number,required:true,min:0,default:1},
	dien_giai:{type:String,default:''},
	status:{type:Boolean,default:true},
	date_created:{type:Date,default:Date.now},
	date_updated:{type:Date,default:Date.now},
	user_created:{type:String,default:''},
	user_updated:{type:String,default:''},
	status: {type:String,default:'5'},
	details:{type:[detailSchema]},
	vatvaos:[vatvaoSchema],
	vatras:[vatraSchema]
});
pktSchema.validate ={
	ma_dvcs:validator.existsDvcs,
	ma_nt:validator.existsNt,
	ngay_ct:validator.unlockBook
}
pktSchema.index({id_app:1,ma_dvcs:1,so_ct:1,ngay_ct:1});
module.exports = mongoose.model('pkt',pktSchema);