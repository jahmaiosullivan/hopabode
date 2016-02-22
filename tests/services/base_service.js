function BaseService() {
    this.testie = 'testies';
}

BaseService.prototype.test = function hasBeenWalked() {
    return this.testie;
}


module.exports = BaseService