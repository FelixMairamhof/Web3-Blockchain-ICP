import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";


actor Token {
    var owner : Principal = Principal.fromText("a6xfb-kxywd-dvkke-47twl-4kfa3-dbbsl-oewf6-ykpho-pknwn-tg25u-pqe");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "PONS";

    var balances = HashMap.HashMap<Principal,Nat>(1, Principal.equal, Principal.hash);

    balances.put(owner, totalSupply);

    public query func balanceOf (who: Principal): async Nat{

        let balance: Nat = switch(balances.get(who)){
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol():async Text{
        return symbol;
    };
    public shared(msg) func payOut(): async Text{
        //msg.caller id from caller
        if(balances.get(msg.caller) == null){
            let amount = 10000;
            balances.put(msg.caller, amount);
            return "Success";
        }else{
            return "Already Claimed";
        }

    };
}