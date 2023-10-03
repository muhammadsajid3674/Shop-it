module.exports = class MerchantRepository {
  constructor(model) {
    this.model = model;
  }

  create(credentials) {
    return new Promise((resolve, reject) => {
      this.model.create(credentials).then((res) => resolve(res));
    });
  }

  getByEmail(email) {
    return new Promise((resolve, reject) => {
      this.model
        .findOne({ email })
        .select("+password")
        .then((res) => resolve(res));
    });
  }

  comparePassword(password) {
    return new Promise((resolve, reject) => {
      this.model.comparePassword(password);
      resolve(password);
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.model.find({}).then((res) => resolve(res));
    });
  }
  findByResetToken(reset_token) {
    return new Promise((resolve, reject) => {
      this.model
        .findOne({ reset_token, token_expired_at: { $gt: Date.now() } })
        .select("+password")
        .then((res) => resolve(res));
    });
  }

  update(id, obj) {
    return new Promise((resolve, reject) => {
      this.model
        .findByIdAndUpdate(id, obj, { new: true })
        .then((res) => resolve(res));
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndDelete(id).then((res) => resolve(res));
    });
  }
};
