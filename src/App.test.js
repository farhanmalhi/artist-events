import React from 'react';
import { render,fireEvent,waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import axios from 'axios';
 


jest.mock('axios');
describe('fetchData', () => {
    it.only('fetches successfully data from an API', async () => {
        const data = {
            thumb_url: 'https://photos.bandsintown.com/thumb/11000395.jpeg',
            mbid: '726ca020-0dfd-4d5f-809d-ebaab18f6e5a',
            support_url: '',
            facebook_page_url: 'http://www.facebook.com/481613251923217',
            image_url: 'https://photos.bandsintown.com/large/11000395.jpeg',
            name: 'AD',
            options: {
                display_listen_unit: false
            },
            id: '143542',
            tracker_count: 8951,
            upcoming_event_count: 1,
            url: 'https://www.bandsintown.com/a/143542?came_from=267&app_id=foo'
        };
        const events = [
            {
                'id': '1023121544',
                'url': 'https://www.bandsintown.com/e/1023121544?app_id=foo&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event',
                'datetime': '2021-10-28T21:00:00',
                'title': '',
                'description': 'asdsad',
                'artist': {
                    'id': '143542',
                    'name': 'AD',
                    'url': 'https://www.bandsintown.com/a/143542?came_from=267&app_id=foo',
                    'mbid': '726ca020-0dfd-4d5f-809d-ebaab18f6e5a',
                    'options': {
                        'display_listen_unit': false
                    },
                    'image_url': 'https://photos.bandsintown.com/large/11000395.jpeg',
                    'thumb_url': 'https://photos.bandsintown.com/thumb/11000395.jpeg',
                    'facebook_page_url': 'http://www.facebook.com/481613251923217',
                    'tracker_count': 8951,
                    'upcoming_event_count': 1,
                    'support_url': ''
                },
                'venue': {
                    'location': 'Los Angeles, CA',
                    'name': 'Catch One',
                    'latitude': '34.047827',
                    'longitude': '-118.324115',
                    'city': 'Los Angeles',
                    'country': 'United States',
                    'region': 'CA'
                },
                'lineup': [
                    'AD'
                ],
                'offers': [
                    {
                        'type': 'Tickets',
                        'url': 'https://www.bandsintown.com/t/1023121544?app_id=foo&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket',
                        'status': 'available'
                    }
                ],
                'artist_id': '143542',
                'on_sale_datetime': '2021-10-04T16:00:00',
                'festival_start_date': '',
                'festival_end_date': '',
                'festival_datetime_display_rule': '',
                'bandsintown_plus': false
            }
        ];
        axios.get.mockImplementationOnce(() => Promise.resolve({data:data}));
        const  container  = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(container.getByPlaceholderText('Search Text')).toBeInTheDocument();
        fireEvent.change(container.getByPlaceholderText('Search Text'), { target: { value: '123' } });
        
        await waitFor(() => container.getByText('AD'));
        expect(container.getByTestId('user-AD')).toBeInTheDocument();
        axios.get.mockImplementationOnce(() => Promise.resolve({data:events}));
        
        fireEvent.click(container.getByTestId('user-AD'));
        await waitFor(() => container.getByText('asdsad'));
    });
    
    
});

