import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import FlightList from "@/views/FlightList"
import router from '@/router';

describe('FlightList.vue', () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = shallowMount(FlightList, {
            global: {
                mocks: {
                    $router: router
                }
            }
        })
    })

    it('FlightList component exist', async () => {
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.findComponent({ name: 'FlightList' }).exists());
    })

    it('Does it route correctly when select available package', async () => {
        wrapper.setData({
            expandedData: { "subcategories": [{ "brandCode": "ecoFly", "price": { "amount": 400, "currency": "TRY" }, "order": 1, "status": "AVAILABLE", "rights": ["20 kg Bagaj", "Ucresiz Yemek Secimi"] }, { "brandCode": "extraFly", "price": { "amount": 500, "currency": "TRY" }, "order": 2, "status": "AVAILABLE", "rights": ["30 kg Bagaj", "Standart Koltuk Secimi", "Ucresiz Yemek Secimi"] }, { "brandCode": "primeFly", "price": { "amount": 800.99, "currency": "TRY" }, "order": 3, "status": "AVAILABLE", "rights": ["50 kg Bagaj", "Standart Koltuk Secimi", "Ucretsiz Degisiklik", "Ucresiz Yemek Secimi"] }] }
        });

        const category = {
            "brandCode": "ecoFly",
            "price": {
                "amount": 400,
                "currency": "TRY"
            },
            "order": 1,
            "status": "AVAILABLE",
            "rights": [
                "20 kg Bagaj",
                "Ucresiz Yemek Secimi"
            ]
        };

        wrapper.vm.expandPackages(category, 'BUSINESS', 0);
        await flushPromises();
        wrapper.vm.confirmFlight(category);

        console.log(wrapper.expandedData);

        expect(wrapper.findComponent({ name: 'SuccessfullSelection' }).exists());
    })
})