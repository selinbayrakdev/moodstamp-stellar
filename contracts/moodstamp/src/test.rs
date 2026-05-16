#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_moodstamp() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(MoodStampContract, ());
    let client = MoodStampContractClient::new(&env, &contract_id);

    let user = Address::generate(&env);
    let other_user = Address::generate(&env);

    assert_eq!(
        client.get_mood(&user),
        String::from_str(&env, "No mood yet")
    );
    assert_eq!(client.get_mood_count(&user), 0);
    assert_eq!(client.get_total_moods(), 0);

    assert_eq!(client.set_mood(&user, &String::from_str(&env, "Happy")), 1);
    assert_eq!(client.get_mood(&user), String::from_str(&env, "Happy"));
    assert_eq!(client.get_mood_count(&user), 1);
    assert_eq!(client.get_total_moods(), 1);

    assert_eq!(
        client.set_mood(&user, &String::from_str(&env, "Focused")),
        2
    );
    assert_eq!(client.get_mood(&user), String::from_str(&env, "Focused"));
    assert_eq!(client.get_mood_count(&user), 2);
    assert_eq!(client.get_total_moods(), 2);

    assert_eq!(
        client.set_mood(&other_user, &String::from_str(&env, "Excited")),
        1
    );
    assert_eq!(
        client.get_mood(&other_user),
        String::from_str(&env, "Excited")
    );
    assert_eq!(client.get_total_moods(), 3);
}
