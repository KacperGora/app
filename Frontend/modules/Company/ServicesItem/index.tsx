import { StyleSheet, Text, View } from 'react-native'
import { Service } from '../CompanyServices'
import { formatDuration, formatPrice } from '@helpers/toString'

const ServiceItem: React.FC<Service> = ({ duration, id, name, price, description }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.priceText}>{formatPrice(price)}</Text>
                <Text style={styles.durationText}>{formatDuration(duration)}</Text>
            </View>
        </View>
    )
}

export default ServiceItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    descriptionText: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 12,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#388e3c',
    },
    durationText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0288d1',
    },
})
