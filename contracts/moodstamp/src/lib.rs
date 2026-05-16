#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String};

#[contract]
pub struct MoodStampContract;

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Mood(Address),
    MoodCount(Address),
    TotalMoods,
}

#[contractimpl]
impl MoodStampContract {
    pub fn set_mood(env: Env, user: Address, mood: String) -> u32 {
        user.require_auth();

        let mood_key = DataKey::Mood(user.clone());
        let count_key = DataKey::MoodCount(user);

        let mut user_count: u32 = env.storage().persistent().get(&count_key).unwrap_or(0);
        let mut total_moods: u32 = env
            .storage()
            .instance()
            .get(&DataKey::TotalMoods)
            .unwrap_or(0);

        user_count += 1;
        total_moods += 1;

        env.storage().persistent().set(&mood_key, &mood);
        env.storage().persistent().set(&count_key, &user_count);
        env.storage()
            .instance()
            .set(&DataKey::TotalMoods, &total_moods);

        user_count
    }

    pub fn get_mood(env: Env, user: Address) -> String {
        env.storage()
            .persistent()
            .get(&DataKey::Mood(user))
            .unwrap_or(String::from_str(&env, "No mood yet"))
    }

    pub fn get_mood_count(env: Env, user: Address) -> u32 {
        env.storage()
            .persistent()
            .get(&DataKey::MoodCount(user))
            .unwrap_or(0)
    }

    pub fn get_total_moods(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::TotalMoods)
            .unwrap_or(0)
    }
}

mod test;
