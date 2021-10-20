module.exports = function(req, res, next){
   if(!req.user.isUnique) return res.status(403).send('Acess Denied')
   next()
}