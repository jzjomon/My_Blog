const doLogin = (req,res)=>{
    res.render('login')
}
const doSignUp = (req,res)=>{
    res.render('signUp')
}
const goHome = (req,res)=>{
    res.render('home')
}
module.exports = { doLogin , doSignUp , goHome }