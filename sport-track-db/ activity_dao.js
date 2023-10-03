class ActivityDAO{

    constructor(){};

    getInstance(){
        return new ActivityDAO();
    }

    findByUser(user_id){
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM activity WHERE user_id = ?', [user_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}