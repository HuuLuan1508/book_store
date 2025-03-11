class User {
    constructor(name, email, password) {
      this.id = Date.now();
      this.name = name;
      this.email = email;
      this.password = password;
    }

    static toMap(name, email, password){
        return {
            "id": Date.now(),
            "name": this.name,
            "email": this.email,
            "password": this.password 
        };
    }
  }