import Card from './components/Card/Card';

function App() {
    return (
        <div>
            <Card
                name='john'
                phone='123'
                email='john@example.com'
                image={{
                    url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                    alt: 'cute cat',
                }}
                favoured={false}
            />
        </div>
    );
}

export default App;
