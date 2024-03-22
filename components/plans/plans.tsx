
import { Button, Card, Divider, Radio, RadioGroup, Switch } from "@nextui-org/react";
import Plan from "./plan";
import Icon from "../elements/icon";
import Tick from "../elements/tick";
import Grid from "../elements/grid";

export default function Plans() {
    return (
        <div className="w-full h-auto m-4">
            <p style={{ fontWeight: 'bold', fontSize: 24 }}>
                PLANS
            </p>
            <h4>
                Manage your billing and payment details
            </h4>
            <Card style={{ width: '100%', height: 'auto', marginTop: 16, borderRadius: 16 }}>
                <Grid xs={4} container>
                    <Grid item xs={1} style={{ textAlign: 'center', display: 'flex' }}>
                        <Plan name='Starter Plan' price={10} chatsPerMonth={1000} nextChatsPerMonth={1} />
                        <Divider orientation='vertical' style={{ height: 'calc(100% - 64px)', marginTop: 32 }} />
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: 'center', display: 'flex' }}>
                        <Plan name='Team' price={25} chatsPerMonth={3000} nextChatsPerMonth={1} />
                        <Divider orientation='vertical' style={{ height: 'calc(100% - 64px)', marginTop: 32 }} />
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: 'center', display: 'flex' }}>
                        <Plan name='Business' price={50} chatsPerMonth={7500} nextChatsPerMonth={0.75} />
                        <Divider orientation='vertical' style={{ height: 'calc(100% - 64px)', marginTop: 32 }} />
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: 'center' }}>
                        <Plan name='Enterprise' />
                    </Grid>
                </Grid>
            </Card>
            <Card style={{ width: '100%', height: 'auto', marginTop: 16, padding: 32, paddingTop: 48, paddingBottom: 48, borderRadius: 16 }}>
                <div className="grid grid-cols-2 gap-4">
                    <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ maxWidth: 400, margin: '0 auto' }}>
                            <p style={{ textAlign: 'left' }}>
                                What include in plan:
                            </p>
                            <div className="grid grid-cols-12" style={{ marginTop: 16 }}>
                                <div className="col-span-6" style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <Tick text={'3000 free chats/mo'} />
                                </div>
                                <div className="col-span-6" style={{ paddingLeft: 8, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <Tick text={<span>Analysis<span style={{ marginLeft: 4, color: 'blue' }}>(JULY)</span></span>} />
                                </div>
                                <div className="col-span-6" style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <Tick text={'5 active chatbots'} />
                                </div>
                                <div className="col-span-6" style={{ paddingLeft: 8, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <Tick text={'Button actions'} />
                                </div>
                            </div>
                            <Tick text={<span>Third Party Integrgations<span style={{ marginLeft: 4, color: 'blue' }}>(AUGUST)</span></span>} />
                            <p style={{ textAlign: 'left', marginTop: 32 }}>
                                Enable auto renew
                            </p>
                            <div className="grid grid-cols-12 gap-4" style={{ marginTop: 8 }}>
                                <div className="col-span-10" style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <p style={{ textAlign: 'left', fontSize: 13 }}>
                                        This option will renew your productive subscription. If current plan
                                        expires. This might prevent your from.
                                    </p>
                                </div>
                                <div className="col-span-2" style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <Switch />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', marginTop: 8, marginBottom: 8 }}>
                            <p style={{ width: 150, textAlign: 'left', fontSize: 14 }}>
                                Billing cycle
                            </p>
                            <RadioGroup orientation="horizontal">
                                <Radio value="monthly">Monthly</Radio>
                                <Radio value="annual">Annual (Save 15%)</Radio>
                            </RadioGroup>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', marginTop: 8, marginBottom: 8 }}>
                            <p style={{ width: 150, textAlign: 'left', fontSize: 14 }}>
                                Team Plan
                            </p>
                            <p style={{ textAlign: 'left', fontSize: 14 }}>
                                $ 25
                            </p>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', marginTop: 8, marginBottom: 8 }}>
                            <p style={{ width: 150, textAlign: 'left', fontSize: 14 }}>
                                Bonus Chats
                            </p>
                            <p style={{ textAlign: 'left', fontSize: 14 }}>
                                500 Chats
                            </p>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', marginTop: 8, marginBottom: 8 }}>
                            <p style={{ flex: 1, textAlign: 'left', fontSize: 14 }}>
                                Total Price
                            </p>
                            <p style={{ fontWeight: 'bold', transform: 'translateX(-32px)', textAlign: 'right', fontSize: 14 }}>
                                $ 25
                            </p>
                        </div>
                        <div style={{ width: '100%', height: 'auto', textAlign: 'left', marginTop: 16 }}>
                            <Button
                                endContent={<Icon name='right' />}
                            >
                                Update Plan
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
