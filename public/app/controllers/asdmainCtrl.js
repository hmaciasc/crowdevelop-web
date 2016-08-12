(function(){

angular.module('mainCtrl', [])
    .config(function($firebaseRefProvider) {
        $firebaseRefProvider.registerUrl({
            default: config.databaseURL,
            object: `${config.databaseURL}/angular/object`
        });
    })
    .factory('ObjectFactory', ObjectFactory)
    .controller('mainController', ctrl);

function ObjectFactory($firebaseObject, $firebaseRef) {
    return $firebaseObject($firebaseRef.Object);
}

function ctrl(ObjectFactory) {
    this.object = ObjectFactory;
    this.sayHello = () => {
        return `Hello, ${this.object.name}`;
    }
}

const Myctrl = new ctrl({ name: 'Hector' });
const message = Myctrl.sayHello();
console.assert(message === 'Hello, Hector');

}());