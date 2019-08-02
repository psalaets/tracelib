import { Range, Summary } from './types'
import TimelineLoader from './loader'

export default class Tracelib {
    public tracelog: object
    private _timelineLoader: TimelineLoader

    public constructor (tracelog: object, range?: Range) {
        this.tracelog = tracelog
    }

    public getFPS(): number[] {
        this._timelineLoader = new TimelineLoader(this.tracelog)
        this._timelineLoader.init()
        return this._timelineLoader.performanceModel.frames().map(( frame ) => (1000 / frame.duration))
    }
}
