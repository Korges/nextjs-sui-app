#[test_only]
module voting_system::voting_system_tests;

#[test]
fun test_create_proposal() {
    use sui::test_scenario;
    use voting_system::proposal::{Self};

    let user = @0xCA;

    let mut scenario = test_scenario::begin(user);
    {
        let title = b"Title".to_string();
        let desc = b"Description".to_string();
        proposal::create(title, desc, 2000000000, scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let created_proposal = scenario.take_shared<proposal::Proposal>();

        assert!(created_proposal.title() == b"Title".to_string());
        assert!(created_proposal.description() == b"Description".to_string());
        assert!(created_proposal.expiration() == 2000000000);
        assert!(created_proposal.voted_yes_count() == 0);
        assert!(created_proposal.voted_no_count() == 0);
        assert!(created_proposal.creator() == user);
        assert!(created_proposal.voter_registry().is_empty());

        test_scenario::return_shared(created_proposal);
    };

    scenario.end();

    
}