module voting_system::dashboard;


public struct Dashboard has key {
    id: UID,
    proposals_ids: vector<ID>
}

fun init(ctx: &mut TxContext) {
    new(ctx);
}

public fun new(ctx: &mut TxContext) {
    let dashboard = Dashboard {
        id: object::new(ctx),
        proposals_ids: vector[]
    };

    transfer::share_object(dashboard);
}

public fun register_propoasal(self: &mut Dashboard, proposal_id: ID) {
    self.proposals_ids.push_back(proposal_id);
}

#[test] fun test_module_init() {
    use sui::test_scenario;
    use voting_system::proposal::{Self};

    let creator = @0xCA;

    let mut scenario = test_scenario::begin(creator);
    {
        init(scenario.ctx());
    };

    scenario.next_tx(creator);
    {
        let dashboard = scenario.take_shared<Dashboard>();
        assert!(dashboard.proposals_ids.is_empty() == true);
        test_scenario::return_shared(dashboard);
    };

    scenario.next_tx(creator);
    {
        let title = b"Title".to_string();
        let desc = b"Description".to_string();
        proposal::create(title, desc, 2000000000, scenario.ctx());
    };

    scenario.next_tx(creator);
    {
        let created_proposal = scenario.take_shared<proposal::Proposal>();
        assert!(created_proposal.title() == b"Title".to_string());
        assert!(created_proposal.description() == b"Description".to_string());
        assert!(created_proposal.expiration() == 2000000000);
        assert!(created_proposal.voted_yes_count() == 0);
        assert!(created_proposal.voted_no_count() == 0);
        assert!(created_proposal.creator() == creator);
        assert!(created_proposal.voter_registry().is_empty());

        test_scenario::return_shared(created_proposal);
    };

    scenario.end();

    let expected = 1;
    let result = 1;

    assert!(expected == result);

}