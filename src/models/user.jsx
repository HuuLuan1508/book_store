class User {
    constructor(name, email, password) {
      this.id = Date.now();
      this.name = name;
      this.email = email;
      this.password = password;
      this.redBooks = new Map([]);
    }

    static toMap(){
        return {
            "id": Date.now(),
            "name": this.name,
            "email": this.email,
            "password": this.password,
            "redBooks": this.redBooks
        };
    }
  }