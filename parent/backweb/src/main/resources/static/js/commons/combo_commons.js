/**
 * 
 */
//var weburl = "http://localhost:8888";

//var backWeburl = "http://localhost:9997";

function loadProductCascade(subjectId, productId, callback) {
	loadProductSubjectByData(subjectId);
	if (!pcg_fun.isEmpty(productId)) {
		$(subjectId).change(function() {
			var val = $(subjectId).val();
			if (pcg_fun.isEmpty(val)) {
				return ;
			}
			loadProduct(productId, {"productSubjectId" : val});
		});
	}
}

function loadProductSubjectByData(subjectId) {
	pcg_fun.loadCommonData(subjectId, productSubjectCombo, "id", "productName", null);
}

function loadProductSubject(id) {
	pcg_fun.loadCommon(id, "/hoper/backweb/productSubjectList", {
		
	}, "id", "productName");
}

function loadProduct(id, param, flag) {
	if (undefined == param)
		param = {};
	pcg_fun.loadCommon(id, "/hoper/backweb/product/getProducts", param, "id", "period", flag);
}

function loadProductCustomer(id) {
	pcg_fun.loadCommonSplicing(id, "/hoper/backweb/product/getProductCustomers", {
		
	}, function(v) {
		var options = "<option value='' selected='selected'>---请选择---</option>";
		for(var i = 0;i < v.length;i++){
			options += "<option value='" + v[i]["id"]+ "'>" + v[i]["productName"]+"-"+v[i]["period"] + "期</option>";
		}
		return options;
	}, null);
}

function loadParamCombo(id) {
	pcg_fun.loadCommonSplicing(id, "/hoper/backweb/param/getParamsOfParamType", {
		"paramType" : "RISK_LEVEL"
	}, function(v) {
		var options = "<option value='' selected='selected'>---请选择---</option>";
		for(var i = 0;i < v.length;i++){
			options += "<option value='" + v[i]["id"]+ "'>" + v[i]["paramCode"]+"-"+v[i]["paramDesc"] + "</option>";
		}
		return options;
	}, null);
}

//=============================
var custTypeCombo = [
	{ "value" : "P",  "text": "个人客户"},
	{ "value" : "E",  "text": "企业客户"}
];
function loadCustTypeCombo(id) {
	pcg_fun.loadCommonData(id, custTypeCombo, "value", "text", null);
}
