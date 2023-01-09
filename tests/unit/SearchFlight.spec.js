import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import SearchFlight from "@/views/SearchFlight"

describe('SearchFlight.vue', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallowMount(SearchFlight)
  })

  it('SearchFlight component exist', async () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: 'SearchFlight' }).exists());
  })

  it('SearchFlight component confirm method check', async () => {
    const mockRouter = {
      push: jest.fn()
    }

    wrapper.setData({
      selectedOrigin: "Nereden",
      selectedDestination: "Antalya",
    })


    await wrapper.vm.confirm();
    await flushPromises()


    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  })
})