'use strict';

describe("User", function() {

        var user;

        beforeEach(function(){
            user = new User('World', 'world@gmail.com', 'hello20');
        });

    describe('User initialises their account', function(){

        it('with a username', function(){
            expect(user.name).toEqual('World');
        });

        it('with an email', function(){
            expect(user.email).toEqual('world@gmail.com');
        });

        it('with a passsword', function(){
            expect(user._password).toEqual('hello20');
        });

    });

});
