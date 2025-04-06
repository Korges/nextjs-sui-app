module voting_system::dashboard;


public struct Dashboard has key {
    id: UID,
    proposals_ids: vector<ID>
}

public struct AdminCapability has key {
    id: UID,
}

fun init(ctx: &mut TxContext) {
    let admin_capability = AdminCapability {id: object::new(ctx)};
    new(&admin_capability, ctx);
    transfer::transfer(
        admin_capability, 
        ctx.sender()
    );
}

public fun new(_admin_capability: &AdminCapability, ctx: &mut TxContext) {
    let dashboard = Dashboard {
        id: object::new(ctx),
        proposals_ids: vector[]
    };

    transfer::share_object(dashboard);
}

public fun register_propoasal(self: &mut Dashboard, proposal_id: ID) {
    self.proposals_ids.push_back(proposal_id);
}

#[test_only]
public fun issue_admin_cap(ctx: &mut TxContext) {
    transfer::transfer(
        AdminCapability {id: object::new(ctx)}, 
        ctx.sender()
    );
}

#[test]
fun test_module_init() {
    use sui::test_scenario;

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

    scenario.end();

}