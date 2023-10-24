const db = uniCloud.database()
const dbCmd = db.command
module.exports = {
	_before: function () {},
	operation(table,attr,id,num){
		let obj = {}
		obj[attr] = dbCmd.inc(num)
		db.collection(table).doc(id).update(obj)
	}

}
