const conn = require('../../config/key.js');

/**
 * 新增资金记录（绑定当前登录用户）
 */
/**
 * 新增资金记录
 */
exports.fundsAdd = (req, res) => {
  const fields = { 
    type: req.body.type || '',
    description: req.body.description || '',
    income: req.body.income || 0,
    expenditure: req.body.expenditure || 0,
    account: req.body.account || 0,
    remark: req.body.remark || ''
    // createtime 由数据库 TIMESTAMP 自动生成
  };

  const sql = 'INSERT INTO funds SET ?';
  conn.connectMySQL(sql, fields, (err, result) => {
    if (err) return res.status(400).json(err);
    if (result.affectedRows !== 1) return res.status(400).json('添加失败');

    // 查询刚插入的完整数据返回给前端
    conn.connectMySQL(
      'SELECT * FROM funds WHERE id = ?',
      result.insertId,
      (err, rows) => {
        if (err) return res.status(400).json(err);
        res.json(rows[0]);
      }
    );
  });
};

/**
 * 查询所有资金记录
 */
exports.fundsAll = (req, res) => {
  const sql = 'SELECT * FROM funds ORDER BY createtime DESC';
  conn.connectMySQL(sql, (err, result) => {
    if (err) return res.status(400).json(err);
    res.json(result);
  });
};

/**
 * 编辑资金记录
 */
exports.fundsEdit = (req, res) => {
  const fields = {};
  const allowFields = ['type', 'description', 'income', 'expenditure', 'account', 'remark'];
console.log("req.body:", req.body);
console.log("req.params.id:", req.params.id);
  allowFields.forEach(key => {
    if (req.body[key] !== undefined) {
      fields[key] = req.body[key];
    }
  });

  if (Object.keys(fields).length === 0) return res.status(400).json('没有可更新的字段');

  const sql = `
    UPDATE funds
    SET ?
    WHERE id = ? 
  `;

  conn.connectMySQL(sql, [fields, req.params.id], (err, result) => {
	  console.log("result", result);
   if (err) {
     console.error("数据库更新错误:", err);
     return res.status(500).json({ message: "数据库更新失败", error: err });
   }
    if (result.affectedRows !== 1) return res.status(403).json('无权限编辑该记录');
    res.json('编辑成功');
  });
};

/**
 * 删除资金记录（只能删除自己的）
 */
exports.fundsDelete = (req, res) => {
  const sql = `
    DELETE FROM funds
    WHERE id = ? 
  `;
  conn.connectMySQL(sql, [req.params.id], (err, result) => {
    if (err) return res.status(400).json(err);
    if (result.affectedRows !== 1) return res.status(403).json('无权限删除该记录');
    res.json('删除成功');
  });
};
