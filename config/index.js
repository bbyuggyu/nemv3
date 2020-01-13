module.exports = {
    // dbUrl : 'mongodb+srv://nemv:fk2dl4wm6@cluster0-csnpe.mongodb.net/nemv',
    dbUrl : 'mongodb://localhost:27017/nemv',
    admin: {
        id: 'memi',
        pwd: '1234',
        name: '관리자'
    },
    jwt: {
        secretKey: 'abcdefg',
        issuer: 'xxx.com',
        subject: 'user-token',
        algorithm: 'HS256',
        expiresIn: 60 * 3, // 기본 3분
        expiresInRemember: 60 * 60 * 24 * 6, // 기억하기 눌렀을 때 6일
        expiresInDiv: 3, // 토큰시간 나누는 기준
    }
}