var validAccount = require("../libs/validator-account");
var kbmlcttttSchema = new Schema({
	id_app:{type:String,required:true},
	stt:{type:Number,required:true},
	ma_so:{type:String,required:true},
	chi_tieu:{type:String,required:true},
	thuyet_minh:{type:String},

	print:{type:Boolean,default:true},
	bold:{type:Boolean,default:false},
	phan_loai:{type:Number,require:true},
	cach_tinh:{type:String,required:true},
	tk_no:[String],
	tk_co:[String],
	giam_tru_no:{type:Boolean,default:false},
	giam_tru_co:{type:Boolean,default:false},
	cong_thuc:{type:String},
	bu_tru_cong_no:{type:Boolean,default:false},
	
	cong_thuc_so_kn:{type:String},
	cong_thuc_so_kn_nt:{type:String},
	cong_thuc_so_kt:{type:String},
	cong_thuc_so_kt_nt:{type:String},
	
	so_kn:{type:Number},
	so_kt:{type:Number},
	so_kn_nt:{type:Number},
	so_kt_nt:{type:Number},
	
	status:{type:Boolean,default:true},
	date_created:{type:Date,default:Date.now},
	date_updated:{type:Date,default:Date.now},
	user_created:{type:String,default:''},
	user_updated:{type:String,default:''}
});
kbmlcttttSchema.validate =  {
	cach_tinh:[function(id_app,value,callback){
			if(value=='1' || value=='2'|| value=='3'){
				callback(true);
			}else{
				callback(false);
			}
		},'Cách tính:1-Mã số,2-Tinh theo số phát sinh,3-Tính theo số dư đầu kỳ,4-Tính theo số dư nợ đầu kỳ,5-Tính theo số dư có đầu kỳ'
	],
	phan_loai:[function(id_app,value,callback){
			if(value=='1' || value=='2'){
				callback(true);
			}else{
				callback(false);
			}
		},'Phân loại:1-chi,2-thu'
	]
};
kbmlcttttSchema.index({id_app:1,stt:1,ma_so:1});
module.exports = mongoose.model("kbmlctttt",kbmlcttttSchema);