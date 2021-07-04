class MaxComb {
    constructor() {
        this.cache = []
    }

    sort(data) {
        //urutkan data dari kecil -> besar (by end)
        let temp
        for (let i = 1; i < data.length; i++) {
            let j = i
            temp = data[i]
            while (j > 0 && temp.end < data[j - 1].end) {
                data[j] = data[j - 1]
                j--
            }
            data[j] = temp
        }
        return data
    }

    getChange(sorted) {
        let combination = []

        //cari kombinasinya
        let findComb = (sorted, sp) => {
            for (let i = 0; i < sorted.length; i++) {
                combination.push([sp + [sorted[i]?.name, sorted[i]?.start, sorted[i].end]])

                findComb(sorted.slice(i + 1), sp + [sorted[i]?.name, sorted[i]?.start, sorted[i].end] + ';')
            }

        }
        findComb(sorted, [])

        let resultSet = combination
        let count = 0
        //cari kombinasi yang waktu mulai >= selesai
        for (let j = 0; j < resultSet.length; j++) {
            if (resultSet[j].toString().includes(';')) {
                let newArr = resultSet[j].toString().split(';')
                let newArr1 = []
                for (let k = 0; k < newArr.length; k++) {
                    newArr1.push(newArr[k].split(','))
                }
                let end = newArr1[0][2]
                let a = 0

                //cek apakah tidak konflik
                let change = (newArr1, a, end) => {
                    for (let m = 1; m < newArr1.length; m++) {
                        if (parseInt(newArr1[m][1]) >= parseInt(end)) {
                            end = newArr1[m][2]
                        } else {
                            a = 1
                            return a
                        }
                    }
                }
                change(newArr1, a, end)

                if (change(newArr1, a, end) != 1) {
                    this.cache[count] = newArr1
                    count += 1
                }
            } else {
                this.cache[count] = resultSet[j].toString().split(',')
                count += 1
            }
        }

        //urutkan hasil yang disimpan dari kecil -> besar (by length)
        this.cache.sort((a, b) => a.length - b.length);

        let n = this.cache[this.cache.length - 1].length;

        //ambil kombinasi yang paling maksimum panjangnya
        const result = this.cache.filter(c => c.length >= n);

        return result;
    }

    choose(data) {
        let sorting = this.sort(data)
        console.log(this.getChange(sorting))
    }

}

module.exports = MaxComb